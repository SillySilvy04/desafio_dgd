import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./graphicTime.module.css";

interface Props {
  repoName: string;
}

interface CommitData {
  weekLabel: string;
  commits: number;
  fullDateRange: string;
}

export function GraphicTime({ repoName }: Props) {
  const [data, setData] = useState<CommitData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const axisTickStyle = {
    fontSize: 11,
    fill: "var(--text-on-dark-secondary)",
  };

  useEffect(() => {
    if (!repoName) return;

    setIsLoading(true);
    setError(null);

    fetch(`https://api.github.com/repos/${repoName}/stats/commit_activity`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        if (res.status === 202) {
          throw new Error("Calculando estatísticas, tente novamente em breve.");
        }
        return res.json();
      })
      .then((apiData) => {
        if (Array.isArray(apiData)) {
          const last4Weeks = apiData.slice(-4);
          const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          });

          const formattedData = last4Weeks.map((item: any) => {
            const startDate = new Date(item.week * 1000);
            const endDate = new Date(
              item.week * 1000 + 6 * 24 * 60 * 60 * 1000
            );

            const startStr = dateFormatter.format(startDate);
            const endStr = dateFormatter.format(endDate);

            return {
              weekLabel: startStr,
              fullDateRange: `${startStr} a ${endStr}`,
              commits: item.total,
            };
          });
          setData(formattedData);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar os dados.");
      })
      .finally(() => setIsLoading(false));
  }, [repoName]);

  if (isLoading) {
    return <div className={styles.loadingContainer}>Carregando gráfico...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.title}>Atividade de Commits</h3>
        <span className={styles.subtitle}>Últimas 4 semanas</span>
      </header>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="weekLabel"
              tick={axisTickStyle}
              stroke="var(--text-muted-on-dark)"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              tick={axisTickStyle}
              stroke="var(--text-muted-on-dark)"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--sidebar-bg, #1e1e1e)",
                borderColor: "var(--border-color, #333)",
                color: "var(--text-primary, #fff)",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0) {
                  return payload[0].payload.fullDateRange;
                }
                return label;
              }}
            />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="var(--accent, #0070f3)"
              strokeWidth={3}
              activeDot={{
                r: 6,
                fill: "var(--accent, #0070f3)",
                strokeWidth: 0,
              }}
              dot={{ r: 4, fill: "var(--accent, #0070f3)", strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

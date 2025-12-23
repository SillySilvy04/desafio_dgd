import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./GraphicLanguages.module.css";

export interface LanguageData {
  name: string;
  value: number;
  [key: string]: any;
}

interface Props {
  data: LanguageData[];
}

const COLORS = ["#C084FC", "#a78bfa", "#818cf8", "#60a5fa", "#34d399"];

export function GraphicUsers({ data }: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Linguagens</h3>

      {data.length > 0 ? (
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="var(--card-bg)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: any) => [`${value} bytes`, "Tamanho"]}
                contentStyle={{
                  backgroundColor: "var(--sidebar-bg, #1e1e1e)",
                  borderColor: "var(--border-color, #333)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                }}
                itemStyle={{ color: "#fff" }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "12px",
                  color: "var(--text-on-dark-secondary, #aaa)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>Sem dados de linguagem.</p>
        </div>
      )}
    </div>
  );
}

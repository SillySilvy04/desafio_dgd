export function Forks({ count }: { count: number }) {
  return (
    <div>
      <strong>Total de Forks: </strong>
      <span>{count}</span>
    </div>
  );
}
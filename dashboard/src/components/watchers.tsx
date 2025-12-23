export function Watchers({ count }: { count: number }) {
  return (
    <div>
      <strong>Total de Watchers: </strong>
      <span>{count}</span>
    </div>
  );
}
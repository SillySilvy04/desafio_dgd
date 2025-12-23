export function Stars({ count }: { count: number }) {
  return (
    <div>
      <strong>Total de Stars: </strong>
      <span>{count}</span>
    </div>
  );
}
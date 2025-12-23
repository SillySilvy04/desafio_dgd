export function RepositoryName({ name }: { name: string }) {
  return (
    <div>
      <strong>Nome do Repositório: </strong>
      <span>{name}</span>
    </div>
  );
}
import tag from './tag.module.scss';

export function Tag({ color, name }) {
  return (
    <div className={tag.tag} style={{ backgroundColor: color }}>
      {name}
    </div>
  );
}

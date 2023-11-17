import tag from './tag.module.scss';

export function Tag({ color, name }) {
  return (
    <div className={tag.tag} style={{ borderColor: color }}>
      {name}
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import myStyles from './Categories.module.css';

const Categories = (props: { color?: string }) => {
  function title() {
    if (props?.color === 'black') {
      return <h1 className={'text-4xl text-center text-slate-950 my-8'}>Categories</h1>;
    }
    return <h1 className={'text-4xl text-center my-8'}>Categories</h1>;
  }
  return (
    <div
      style={{ color: '#E5E7EB' }}
      className={'flex flex-col justify-center items-center w-full p-8'}
    >
      {title()}
      <div
        className={
          'flex flex-wrap flex-col3 justify-between justify-evenly gap-6 w-full md:flex-row'
        }
      >
        <NavLink
          to={'/catalog/thrillers'}
          className={
            'h-36 w-36 flex items-center justify-center rounded-md relative md:h-56 md:w-56'
          }
        >
          <div className={`${myStyles.categImg} ${myStyles.thriller}`}>Thrillers</div>
        </NavLink>
        <NavLink
          to={'/catalog/erotica'}
          className={
            'h-36 w-36 flex items-center justify-center rounded-md relative md:h-56 md:w-56'
          }
        >
          <div className={`${myStyles.categImg} ${myStyles.ero}`}>Erotica</div>
        </NavLink>
        <NavLink
          to={'/catalog/horrors'}
          className={
            'h-36 w-36 flex items-center justify-center rounded-md  relative md:h-56 md:w-56 '
          }
        >
          <div className={`${myStyles.categImg} ${myStyles.horror}`}>Horrors</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Categories;

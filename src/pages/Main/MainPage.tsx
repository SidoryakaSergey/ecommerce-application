import { NavLink } from 'react-router-dom';
import books from '../../assets/img/DreamShaper_v7_large_wooden_bookcase_filled_with_large_book_fr_3 (1).png';
import Categories from '../../components/categories/Categories.tsx';

function MainPage() {
  return (
    <div style={{ background: 'linear-gradient(rgb(4, 23, 30), rgb(8 35 45))' }}>
      <div
        style={{ color: '#E5E7EB' }}
        className={'flex flex-col p-4 justify-evenly md:flex-row  items-center'}
      >
        <div
          className={
            'flex flex-col items-center justify-center gap-6 text-justify h-full w-full md:w-1/2'
          }
        >
          <h1 className={'text-5xl text-center my-8'}>
            Welcome to <br /> <span className={'font-bold'}>Doomsday</span> <br /> store
          </h1>

          <p className="mb-3 w-1/2 text-sm first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left lg:text-xl">
            Doomstore is an online bookshop that offers a wide range of books from various genres.
            In our store, you will find a multitude of thrilling thrillers, chilling horrors, and
            enticing erotica. We take pride in providing a variety of books to cater to the
            interests of every reader. Additionally, we have many other genres available, such as
            science fiction, romance, detective stories, and much more.
          </p>
          <p className=" text-sm w-1/2 lg:text-xl">
            We strive to provide our customers with a convenient platform to purchase and read books
            online, so they can enjoy captivating and immersive stories anytime and anywhere.
          </p>
          <NavLink
            to={'/catalog'}
            type="button"
            className="transition-all text-transform: uppercase my-8 justify-self:start text-gray-800 font-bold bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg px-5 py-2.5 text-center mr-2  hover:scale-105  text-xl"
          >
            Start Your Reading Journey
          </NavLink>
        </div>
        <div className={'flex justify-center items-center w-3/6'}>
          <img style={{ filter: 'grayscale(65%)' }} src={books} alt="books" />
        </div>
      </div>
      <Categories />
    </div>
  );
}

export default MainPage;

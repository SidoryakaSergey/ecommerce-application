import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import myStyles from './HorrorsPage.module.css';
import Products from '../../../components/Products/Products.tsx';
import Categories from '../../../components/categories/Categories.tsx';

function HorrorsPage() {
  const productsProps = {
    catalogValue: 'horrors',
  };
  return (
    <div className={myStyles.main}>
      <div className={myStyles.mainBox}>
        <div className={myStyles.carouselBox}>
          <Carousel
            className={styles}
            autoPlay={true}
            infiniteLoop={true}
            swipeable={true}
            emulateTouch={true}
            showThumbs={false}
            dynamicHeight={true}
          >
            <div>
              <img
                role={'img'}
                alt={'banner1'}
                src="https://raw.githubusercontent.com/ZiberPax/repoForData/main/eCom%20Img/DreamShaper_v7_A_DOOMSDAY_book_store_poster_with_books_in_apoc_01%20(1).png"
              />
            </div>
            <div>
              <img
                alt={'banner2'}
                src="https://raw.githubusercontent.com/ZiberPax/repoForData/main/eCom%20Img/DreamShaper_v7_A_DOOMSDAY_book_store_poster_with_a_bright_star_0.png"
              />
            </div>
            <div>
              <img
                alt={'banner3'}
                src="https://raw.githubusercontent.com/ZiberPax/repoForData/main/eCom%20Img/DreamShaper_v7_A_DOOMSDAY_book_store_poster_with_a_large_open_0.png"
              />
            </div>
          </Carousel>
        </div>
        <Products {...productsProps} />
        <Categories color="black" />
      </div>
    </div>
  );
}

export default HorrorsPage;

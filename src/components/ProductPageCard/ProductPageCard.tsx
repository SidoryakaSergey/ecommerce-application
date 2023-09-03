import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Modal from 'react-modal';
import { ProductsArr } from '../../interfaces/productsI.ts';
import getProduct from '../../fetchs/getProduct.ts';
import styles from './ProductPageCard.module.css';
import DescLabel from './DescLabel/DescLabel.tsx';
import MyButton from '../Button/MyButton.tsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ProductPageCardProps {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
Modal.setAppElement('body');

const ProductPageCard = (props: ProductPageCardProps) => {
  const { id } = props;
  const [product, setProduct] = useState<ProductsArr>();
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = () => {
      getProduct(id)
        .then((response: ProductsArr) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          setProduct(response);
        })
        .catch((error: Error) => {
          return error.message;
        });
    };
    fetchProducts();
  }, [id]);

  const customStyles = {
    content: {
      maxHeight: '70vh',
    },
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (product) {
    const { images } = product.masterData.current.masterVariant;

    return (
      <div className={styles.pageBox}>
        <div className={styles.imageBox}>
          {!showModal ? (
            <Swiper
              style={{ height: '100%' }}
              grabCursor={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className={styles.imageWrapper}
              spaceBetween={50}
              slidesPerView={1}
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img
                    onClick={() => openModal(index)}
                    className={styles.image}
                    src={image.url}
                    alt={'cover'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
        <Modal style={customStyles} isOpen={showModal} onRequestClose={closeModal}>
          <Swiper
            style={{ height: '100%' }}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className={styles.modalSwiper}
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={selectedImageIndex}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img className={`${styles.moduleImg}`} src={image.url} alt={'cover'} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Modal>
        <div className={styles.descriptionBox}>
          <div>
            <div>
              <div>
                <label
                  className={styles.fontAdaptiveName}
                  style={{ color: 'rgb(13, 12, 34)', fontWeight: 'bold' }}
                >
                  {product.masterData.current.name['en-US']}
                </label>
              </div>
              <div>
                <label className={styles.fontAdaptiveAutor} style={{ color: 'rgb(13, 12, 34)' }}>
                  {product.masterData.current.masterVariant.attributes[0].value}
                </label>
              </div>
            </div>
            <div>
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[1].name}
                value={product.masterData.current.masterVariant.attributes[1].value}
              />
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[2].name}
                value={product.masterData.current.masterVariant.attributes[2].value}
              />
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[3].name}
                value={product.masterData.current.masterVariant.attributes[3].value}
              />
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[4].name}
                value={product.masterData.current.masterVariant.attributes[4].value}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <MyButton
              value={product.masterData.current.masterVariant.prices[0].value.centAmount / 100}
            />
          </div>
        </div>
        <div className={styles.annotaion}>
          {product.masterData.current.masterVariant.attributes[5].value}
        </div>
      </div>
    );
  }
  return <div>Wait</div>;
};

export default ProductPageCard;

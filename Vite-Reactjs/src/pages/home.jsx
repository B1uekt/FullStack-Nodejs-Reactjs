// Import các thành phần của Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/home.scss';
// Import các module cần thiết
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import slider1 from '../assets/images/slider_1.png';
import slider2 from '../assets/images/slider_2.png';
import slider3 from '../assets/images/slider_3.png';

const HomePage = () => {
    return (
        <Swiper className='slider'
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false, stopOnLastSlide: true }}
        >
            <SwiperSlide>
                <img src={slider1} alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slider2} alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slider3} alt="Slide 3" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={slider1} alt="Slide 4" />
            </SwiperSlide>
        </Swiper>
    )
}

export default HomePage;

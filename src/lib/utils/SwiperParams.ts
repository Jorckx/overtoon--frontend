	// https://swiperjs.com/swiper-api#parameters

import { FreeMode, Mousewheel, Pagination, Scrollbar } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types';
const modules = [FreeMode, Pagination, Scrollbar, Mousewheel]

// for image gallery's >> already set as default
export const defaultParams: SwiperOptions = {
	slidesPerView: 'auto',
	spaceBetween: 0,
	loop: true,
	centeredSlides: false,
	grabCursor: false,
	speed: 500,
	navigation: {
   	nextEl: ".swiper-next",
   	prevEl: ".swiper-prev",
 	},
	direction: 'horizontal',
	modules: modules,
	keyboard: {
		enabled: true,
		onlyInViewport: true
	},
};

// cards
export const cardParams: SwiperOptions = {
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,
		centeredSlides: true,
		freeMode: {
			enabled: true,
      momentum: false, // no easing after drag/wheel
			sticky: false,
		},
		grabCursor: true,
		speed: 8000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
		navigation: {
     	nextEl: ".swiper-next",
     	prevEl: ".swiper-prev",
   	},
		direction: 'horizontal',
    mousewheel: {
      enabled: true,
      sensitivity: 0.8,
    },
		modules: modules,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
	};

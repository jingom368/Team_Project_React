import React, { useState } from 'react'
import beach from '../../assets/img/beach.jpg'
import bird from '../../assets/img/bird.png'
import butterfly from '../../assets/img/butterfly.jpg'
import forest from '../../assets/img/forest.jpg'
import mountain from '../../assets/img/mountain.jpg'
import axios from 'axios'

export default function RoomImageSlide(props) {
    const [images, setImages] = useState(null)
    const getApi = () => {
        axios.get('https://localhost/star').then((res) => {
            setImages(res.data)
            console.log(res.data)
        })
    }
    // url 컨텍스트
    // 컨텍스트 꺼내서 인덱스를 넘겨줘서
    // 꺼내서 호출하는 코드만 넣어놓으면
    // const images = [beach, bird, butterfly, forest, mountain, beach]
    const [currentIndex, setCurrentIndex] = useState(0)
    const image_length = props.image_length

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    }

    // 슬라이드의 개수를 동적으로 조절하는 로직
    const getSlides = () => {
        if (images.length < image_length) {
            return images
        } else {
            let slides = images.slice(currentIndex, currentIndex + image_length) // 슬라이스의 배열을 현재부터 5개로 쪼갬
            while (slides.length < image_length) {
                slides = [
                    ...slides,
                    ...images.slice(0, image_length - slides.length),
                ]
            }
            return slides
        }
    }
    return (
        <div className="w-full h-200 pt-16">
            <div className="flex flex-col items-center">
                <div>Explore dreamy places</div>
                <button onClick={prevSlide}>Prev</button>
                <div className=" w-full flex flex-row">
                    {getSlides().map((image, i) => (
                        <div key={i} className="w-full flex flex-row">
                            <img
                                src={image}
                                className="w-full h-full pl-4 object-cover"
                                alt=""
                            />
                        </div>
                    ))}
                </div>
                <button onClick={nextSlide}>Next</button>
            </div>
        </div>
    )
}
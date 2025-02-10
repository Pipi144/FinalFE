import Image from "next/image";
import imgBanner from "./favicon.ico";
import { BlurFade } from "@/components/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import AnimatedButton from "@/components/AnimatedComponents/animated-button";
export default function Home() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <BlurFade delay={0.5} inView>
        <Image
          src={imgBanner}
          alt="img banner"
          width={100}
          height={100}
          className="md:w-[150px] object-cover mb-[10px] md:mb-[20px]"
        />
      </BlurFade>

      <TextAnimate
        animation="slideUp"
        by="word"
        className="font-Gorditas  text-center text-4xl md:text-7xl font-bold   md:leading-[5rem]"
      >
        Welcome to fizz buzz
      </TextAnimate>

      <AnimatedButton
        animate={{
          y: [10, 0],
          opacity: [0, 1],
        }}
        transition={{
          delay: 0.5,
          once: true,
          duration: 0.5,
        }}
        whileTap={{
          scale: 0.9,
          transition: {
            type: "spring",
            mass: 0.5,
            stiffness: 160,
            damping: 16,
          },
        }}
        className="bg-black text-white hover:bg-slate-500 hover:text-white text-base px-2 py-1 rounded-sm mt-3 min-w-[70px] font-concert font-bold"
      >
        Play
      </AnimatedButton>
    </div>
  );
}

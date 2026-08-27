import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const imageIds = Array.from({ length: 8 }, (_, i) => i + 5);
  const container = useRef();
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        delay: 2,
      });
      tl.from(
        ".start-left",
        {
          xPercent: -100,
          opacity: 0,
          stagger: 0.25,
        },
        0,
      ).from(
        ".start-right",
        {
          xPercent: 100,
          opacity: 0,
          stagger: 0.25,
        },
        0,
      );
      const animateBoxes = (selector, xDirection) => {
        const boxes = gsap.utils.toArray(selector, container.current);
        boxes.forEach((box) => {
          gsap.from(box, {
            xPercent: xDirection * 100,
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          });
        });
      };
      const animateReveal = (selector) => {
        const elements = gsap.utils.toArray(selector, container.current);
        elements.forEach((el) => {
          gsap.from(el, {
            y: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          });
        });
      };
      const animateGallery = () => {
        const galleryTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".gallery",
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        });
        galleryTl.from(".image", {
          y: 100,
          opacity: 0,
          stagger: 0.1,
        });
      };
      animateBoxes(".left", -1);
      animateBoxes(".right", 1);
      animateReveal(".once");
      animateGallery();
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      if (container.current) {
        resizeObserver.observe(container.current);
      }
      return () => resizeObserver.disconnect();
    },
    { scope: container },
  );

  return (
    <main ref={container} className="w-full overflow-x-hidden">
      <div className="flex flex-col h-screen bg-[url(/public/1.png)] bg-no-repeat bg-center bg-cover p-10 items-center gap-10 text-white text-xl">
        <div className="flex gap-3 backdrop-blur-sm p-3 start-left">
          <img src="logo-white.png" alt="Logo" className="size-10" />
          <h1>56 Leonard Street</h1>
        </div>
        <div className="backdrop-blur-sm p-3 start-right">
          <a href="#about" className="flex transition hover:scale-110">
            About
          </a>
        </div>
        <div className="backdrop-blur-sm p-3 start-left">
          <a href="#history" className="flex transition hover:scale-110">
            History
          </a>
        </div>
        <div className="backdrop-blur-sm p-3 start-right">
          <a href="#arch" className="flex transition hover:scale-110">
            Architecture
          </a>
        </div>
        <div className="backdrop-blur-sm p-3 start-left">
          <a href="#gallery" className="flex transition hover:scale-110">
            Gallery
          </a>
        </div>
      </div>
      <div className="flex justify-center my-10 once">
        <h1 className="backdrop-blur-sm p-3" id="about">
          About
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-y-10">
        <div className="left w-full px-20 max-md:pl-10 backdrop-blur-sm flex items-center order-2 md:order-1">
          56 Leonard Street (known colloquially as the Jenga Building or Jenga
          Tower) is an 821 ft-tall (250 m), 57-story skyscraper on Leonard
          Street in the neighborhood of Tribeca in Manhattan, New York City.
          Completed in 2017, the building was designed by the Swiss architecture
          firm Herzog & de Meuron, which describes the building as "houses
          stacked in the sky." It is the tallest structure in Tribeca.
        </div>
        <img
          src="2.jpg"
          alt="top"
          className="right aspect-3/4 w-sm order-1 md:order-2 self-end"
        />
      </div>
      <div className="flex justify-center my-10 once">
        <h1 className="backdrop-blur-sm p-3" id="history">
          History
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-y-10">
        <img src="3.jpg" alt="top" className="left w-sm aspect-square" />
        <div className="right w-full backdrop-blur-sm px-20 max-md:pr-10 flex items-center">
          Alexico Group's Izak Senbahar purchased the land and the air rights in
          2007 from the New York Law School for US$150 million. Construction
          began that same year. Foundation work on this tower began in 2008, but
          was shut down before the end of the year when the project was put on
          hold. After nearly four years, construction resumed in October 2012.
        </div>
      </div>
      <div className="flex justify-center my-10 once">
        <h1 className="backdrop-blur-sm p-3" id="arch">
          Architecture
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-y-10">
        <div className="left w-full px-20 max-md:pl-10 backdrop-blur-sm flex items-center order-2 md:order-1">
          56 Leonard is designed by the 2001 Pritzker Prize-winning Swiss
          architecture firm Herzog & de Meuron. Anish Kapoor, known for the
          public sculpture Cloud Gate in Chicago, designed a similar sculpture
          to sit at the base of the building. Herzog & de Meuron also designed
          the building's interiors, which include custom-designed kitchens,
          fixtures, bathrooms, and fireplaces. Goldstein, Hill & West Architects
          LLP is the architect of record.
        </div>
        <img
          src="4.jpg"
          alt="top"
          className="right w-sm order-1 md:order-2 self-end aspect-square"
        />
      </div>
      <div className="flex justify-center my-10 once">
        <h1 className="backdrop-blur-sm p-3" id="gallery">
          Gallery
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-center gallery">
        {imageIds.map((id) => (
          <img
            key={id}
            src={`${id}.jpg`}
            alt={`${id}`}
            className="aspect-3/4 object-cover image"
          />
        ))}
      </div>
      <div className="flex justify-center my-10">
        <div className="flex gap-3 backdrop-blur-sm p-3">
          <img src="logo-black.png" alt="Logo" className="size-10" />
          <h1>56 Leonard Street</h1>
        </div>
      </div>
    </main>
  );
}

export default App;

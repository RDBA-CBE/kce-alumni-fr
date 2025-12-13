"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AlumniConnect() {
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0); // motion value for horizontal movement

  // detect screen size
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 990);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // continuously move text using requestAnimationFrame
  useAnimationFrame((t, delta) => {
    if (paused || isMobile) return;

    const speed = 200; // pixels per second
    const move = (speed * delta) / 1000;
    let current = x.get();

    // move to right, loop back when out of view
    current += move;
    if (current > window.innerWidth) current = -window.innerWidth;

    x.set(current);
  });

  return (
    <section className="py-4 overflow-hidden bg-blue w-100">
      <motion.div
        className="d-flex align-items-center gap-4 text-white fw-semibold fs-10 text-orange whitespace-nowrap"
        style={{ x }}
      >
        <span className="text-white scroll-connect">
          CONNECT with your classmates on your Alumni Association
        </span>

        <div className="call-to-btn text-start mt-0">
          <Link
            href="#"
            className="rbt-btn btn-gradient hover-icon-reverse radius-round d-flex align-items-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="icon-reverse-wrapper">
              <span className="btn-text">Register Now</span>
              <span className="btn-icon">
                <i className="feather-arrow-right"></i>
              </span>
              <span className="btn-icon">
                <i className="feather-arrow-right"></i>
              </span>
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

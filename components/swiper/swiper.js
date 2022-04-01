import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import styles from "./swiper.module.css"

// taken from: 
// https://www.geeksforgeeks.org/how-to-create-tinder-card-swipe-gesture-using-react-and-framer-motion/


// TODO: check this repository
// https://www.npmjs.com/package/react-tinder-card

// TODO: try a 3D way with Motion Framer


export default function Swiper( { title, description, zIndex } ){

    // Framer animation hook
    const controls = useAnimation();

    // make disappear by scaling to 0
    function disappearAnimation(){
        /*controls.start({
            scale: 0,
            transition: {duration: 0.2}
        })*/

        controls.start({
            x: 200,
            scale: 0
        })
    }

    // To move the card as the user drags the cursor
    const x = useMotionValue(0);

    // To rotate the card as the card moves on drag
    const rotateValue = useTransform(x, [-200, 200], [-50, 50]);

    // To decrease opacity of the card when swiped
    // on dragging card to left(-200) or right(200)
    // opacity gradually changes to 0
    // and when the card is in center opacity = 1
    const opacity = useTransform(
        x,
        [-200, -150, 0, 150, 200],
        [0, 0.5, 1, 0.5, 0]
    );

    const background = useTransform(
        x,
        [-100, 0, 100],
        ["rgb(200, 0, 0)", "rgb(255, 255, 255)", "rgb(0, 200, 0)"]
      )

    const rotate = useTransform(x, [-200, 200], [-30, 30]);

    return (
            <motion.div 
                animate={controls}
                drag="x"
                dragSnapToOrigin="true"
                dragElastic={0.8}

                style={{
                    x,
                    opacity,
                    background,
                    rotate,
                    zIndex,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundColor: "#55ccff",
                    boxShadow: "5px 10px 18px #888888",
                    borderRadius: 10,
                    height: 300,
                    width: 200
                }}

                onDragEnd={
                    (event, info) => {
                        console.log(info.point.x, info.point.y)

                        if(info.point.x > 200){
                            console.log("Yes")

                            // make it disappear
                            //disappearAnimation()

                            controls.start({
                                x: 200,
                                scale: 0
                            })
                           
                        }else if(info.point.x < -200){
                            console.log("No")

                            // make it disappear
                            //disappearAnimation()
                            controls.start({
                                x: -200,
                                scale: 0
                            })
                        } 
                    }
                }>

                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

            </motion.div>
    );
}

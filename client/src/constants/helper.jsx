import { Star, StarHalf} from "lucide-react";
import { Color } from "./color";

export const starsGenerator = (
    rating, 
    stroke="0", 
    size, 
    fill = Color.customYellow
 )=>{
    return Array.from({ length: 5 }, (elem, index)=>{
        const number = index + 0.5;
        return(
            <span key={index}>
              { rating>=index+1 ? (
                <Star fill={fill} stroke={stroke} size={size}/>
              ) : rating >=number ? (
                    <StarHalf fill={fill} stroke={stroke} size={size} />
              ) : (
                //Colors = Color
                <Star stroke={Color.customYellow} size={size}  />
              ) }
            </span>
        )
    })
};
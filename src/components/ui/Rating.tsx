import { Star } from "lucide-react";

interface IProps {
    starsCount: number;
}

const Rating = ({ starsCount = 1 }: IProps) => {
    const normalizedStarsCount = Math.min(Math.max(starsCount, 1), 5);

    const stars = Array.from({ length: normalizedStarsCount }, (_, index) => (
        <Star key={index} color='#eee333' />
    ));

    const grayStars = Array.from({ length: 5 - normalizedStarsCount }, (_, index) => (
        <Star key={normalizedStarsCount + index} color='#d7d7d7' />
    ));

    return (
        <div className="flex gap-1 rating">
            {stars}
            {grayStars}
        </div>
    );
};

export default Rating;

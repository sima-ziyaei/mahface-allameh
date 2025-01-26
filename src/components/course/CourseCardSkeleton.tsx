import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CourseCardSkeleton = () => {
    return (
        <>
            <Skeleton width={316} height={200} />
            <Skeleton width={290} height={28} className="mt-4" />
            <Skeleton width={190} height={20} className="mt-3" />
            <Skeleton width={316} height={15} className="mt-6" />
            <Skeleton width={116} height={15} className="mt-1" />
            <Skeleton width={150} height={20} className="mt-6" />
            <div className="flex justify-between items-center mt-6">
                <Skeleton width={200} height={40} />
                <Skeleton width={90} height={24} />
            </div>
        </>
    )
}

export default CourseCardSkeleton;
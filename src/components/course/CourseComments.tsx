import { CommentServices } from '@/services/Comment'
import t from '../../../i18next/locales/fa/translation.json'
import { useEffect, useState } from 'react'
import Comment from '@/models/comment.model';
import { CircularProgress } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const CourseComments = ({ courseId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState<string>('');
    const userId = JSON.parse(localStorage.getItem('userInfo')).userId;
    const [sending, setSending] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const addComment = () => {
        setSending(true);
        CommentServices.add({ courseId: courseId, text: text, userId: userId }).then(() => {
            CommentServices.getByCourseId(courseId).then((res) => {
                console.log(res.data);
                setComments(res.data);
                setText('');
                setSending(false)
            }).catch((err) => {});
        }).catch((err) => {});
    }

    useEffect(() => {
        setLoading(true)
        CommentServices.getByCourseId(courseId).then((res) => {
            setComments(res.data);
            setLoading(false);
        }).catch((err) => {});
    }, [])

    return (
        <div className='mx-4 flex flex-col'>
            <h2> {t['course-comments']} </h2>

            <textarea onChange={(e) => setText(e.target.value)} value={text} className='min-h-[150px] w-full border-2 border-solid focus:!border-[#1f848b] outline-none border-gray-200 rounded-2xl mt-6 p-2' />
            <button disabled={text === '' || sending} onClick={addComment} className='bg-[#009CA7] disabled:cursor-not-allowed hover:bg-[#1f848b] mr-auto mt-6 py-2 px-6 rounded-lg text-white flex items-center gap-3'> {t['send']} {sending ? <CircularProgress color="inherit" size={'24px'} /> : null} </button>

            {loading
                ? Array.from(Array(5)).map((el, i) => {
                    return (
                        <div key={i} className='py-6 border-b border-solid border-gray-200'>
                            <div className='flex items-center gap-3'>
                                <Skeleton width={72} height={72} containerClassName='rounded-full' />
                                <div>
                                    <Skeleton width={150} height={25} />
                                    <div className='flex gap-2 items-center mt-1 '>
                                        <Skeleton width={16} height={16} />
                                        <Skeleton width={80} height={16} />
                                    </div>

                                </div>
                            </div>
                            <Skeleton width={450} height={20} className='mt-8' />
                        </div>
                    )
                })
                : comments.map((el) => {
                    const persianDate = new Intl.DateTimeFormat("fa-IR", {
                        calendar: "persian",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }).format(new Date(el.createdDate));

                    return (
                        <div className='py-6 border-b border-solid border-gray-200'>
                            <div className='flex items-center'>
                                <img src='/assets/user.png' width={72} />
                                <div>
                                    <h3 className='text-xl'> {el.userFirstName} {el.userLastName} </h3>
                                    <div className='flex gap-2 items-center mt-1 mr-2'>
                                        <img width={16} className=' invert-[46%] sepia-[9%] saturate-[620%] hue-rotate-[182deg] brightness-[94%] contrast-[88%]' src='/assets/icons/calendar.svg' />
                                        <p className='text-gray-500 text-sm'> {persianDate} </p>
                                    </div>
                                </div>

                            </div>
                            <p className='mt-6 mr-2'> {el.text} </p>
                        </div>
                    )
                })}
        </div>
    )
}

export default CourseComments;
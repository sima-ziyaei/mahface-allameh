import { CommentServices } from '@/services/Comment'
import t from '../../../i18next/locales/fa/translation.json'
import { useState } from 'react'

const CourseComments = ({courseId}) => {

    const [comments, setComments] = useState();
    const [text, setText] = useState<string>()

    const addComment = () => {
        CommentServices.add({courseId: courseId, text: text }).then(()=>{
            CommentServices.getByCourseId(courseId).then((res)=>{
                setComments(res.data)
            })
        })
    }


    return(
        <div className='mx-4'>
        <h2> {t['course-comments']} </h2>

        <textarea  value={text} className=' w-full border-2 border-solid focus:!border-[#1f848b] outline-none border-gray-200 rounded-2xl mt-6 p-2' />
        <button className='bg-[#009CA7] hover:bg-[#1f848b] justify-between py-2 px-6 rounded-lg text-white self-center '> {t['send']} </button>
    </div>
    )
}

export default CourseComments;
import { useState } from 'react'
import QuillEditor from '../components/QuillEditor'
import css from './createpost.module.css'
import { useNavigate } from 'react-router-dom'

export const CreatePost = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleContentChange = () => {
    setContent(content)
  }

  const createPost = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      //기본 유효성 검사
      if (!title || !content || !summary) {
        setError('모든 필드를 입력해주세요')
        return
      }
      // 업로드할 파일을 data로 정리
      const data = new FormData()
      data.set('title', title)
      data.set('summary', summary)
      data.set('content', content)

      // 첨부 파일이 있는 경우에만 추가
      if (files[0]) {
        // 파일 크기, 형식 검사
        // 1024 * 1024 * 5
        // console.log('파일 크기:', files[0].size)
        // [image/jpeg, image/png, image/jpg]
        // console.log('파일 형식:', files[0].type)

        data.set('file', files[0])
      }
      try {
        setIsSubmitting(true)
        const postData = await createPost(data)
        console.log('등록 성공', postData)
        setIsSubmitting(false)
        navigate('/')
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.log(err)
      setError('', err.message)
    } finally {
      setIsSubmitting(false)
      setError('')
    }
  }
  return (
    <main className={css.createpost}>
      <h2>글쓰기</h2>
      <form className={css.writecon} onSubmit={createPost}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="summary">요약내용</label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <label htmlFor="files">파일</label>
        <input
          type="file"
          id="files"
          name="files"
          accept="image/*"
          value={files}
          onChange={e => setFiles(e.target.value)}
        />
        <label htmlFor="content">내용</label>
        <div className={css.editorWrapper}>
          <QuillEditor
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록중...' : '등록'}
        </button>
      </form>
    </main>
  )
}

import './App.css';
import styled, {createGlobalStyle} from 'styled-components';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #eaeaea;
    position: relative
  }
`

const Layout = styled.div`
  background-color: #ffffff;
  width: 645px;
  min-height: 1085px;
  border-top: 8px solid #fad312;
  margin: 121px auto;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`

const ContentWrapper = styled.div`
  padding: 54px 42px
`
const Title = styled.div`
  font-size: 36px;
  margin-bottom: 35px;
  font-weight: bold;
  letter-spacing: -1.8px;
`
const Discription = styled.div`
  font-size: 14px;
  margin-top: 11px;

  & + & {
    margin-bottom: 22px;
  }
`
const Required = styled.span`
  color: #e74149;
  font-size: 16px;
  
  &:before{
    content:"*  "
  }
`
const Form = styled.form`
`
const QuestionWrapper = styled.div`
  margin-top: 55px;
`
const QuestionTitle = styled.div`
  color: #000000;
  font-size: 20px;
  
  &::after{
    content:"  *";
    color: #e74149;
  }

  ${props => props.$notRequied && `
    &::after{
      content:""
    }
  `}
`
const QuestionInput = styled.input`
  width: 287px;
  height: 23px;
  margin-top: 20px;
  &::placeholder{
    color: #afafaf;
    font-size: 16px;
  }
`

const QuestionRadio = styled.input`
  margin-top: 20px;
`

const Label = styled.label`
  font-size: 14px;
  color: #000000
`
const QuestionDescription = styled.div`
  margin-top: 12px;
  color: #000000;
  font-size: 14px;
`

const SubmitBtn = styled.input`
  background-color: #fad312;
  width: 92px;
  height: 40px;
  color: #000000;
  font-size: 15px;
  margin: 55px 0 21px 0;
  padding: 13px 25px 13px 25px;
  text-align: center;
  vertical-align: center;
  border-radius: 3px;
  box-sizing: border-box;
  border: none
`
const Footer = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  line-height: 60px;
  text-align: center;
  background-color: #000000;
`

const Warnning = styled.div`
  margin-top: 10px;
  font-style: italic;
  ${props => props.$fill ? `color: transparent`: `color: red`}
`

function App() {

  const handleSubmit = (e) => {
    if (!handleFill()) return e.preventDefault()
    alert(formatOutput(infos))
  }

  const [infos, setInfos] = useState([
    {
      'nickName':'',
      'fill': false
    },
    {
      'email':'',
      'fill': false
    },
    {
      'phoneNumber':'',
      'fill': false
    },
    {
      'type':'',
      'fill': false
    },
    {
      'howToKnow':'',
      'fill': false
    },
    {
      'others':'',
      'fill': true
    }
  ])


  const handleInputChange = (e) => {
    let targetName = e.target.name
    let targetValue = e.target.value
    setInfos(
      infos.map(info => {
        if (Object.keys(info)[0] === targetName) {
          info[targetName] = targetValue
        }
        return info
        }
      )
    )
  }
// check if fill => 送出前檢查欄位是否有東西，有的話 fill 改成 true
  const handleFill = () => {
    setInfos(
      infos.map(info => {
        let key = Object.keys(info)[0]
        if (info[key]) info.fill = true
        return info
        }
      )
    )
    for (let i = 0; i < infos.length; i++) {
      if (infos[i] === 'other') continue
      if (!infos[i].fill) return false
    }
    return true
  }
// 
  const handleRadioChecked = () => {
    let checkedOption = document.querySelector('input[type="radio"]:checked')
    if (!(checkedOption === null)) {
      let checkedOptionText = checkedOption.closest('label').textContent
      setInfos(
        infos.map(info => {
          let key = Object.keys(info)[0]
          if (key === 'type') info[key] = checkedOptionText
          return info
        })
      )
    }
    // 案送出的時候：
    // 1. 檢查有沒有 check 2. 有的話把 check 的選項拿出來放到 info （checkisFull 會檢查有沒有東西
  }
  

  const formatOutput = (infos) => {
    let otherContent
    if (infos[5].others) {
      otherContent = infos[5].others
    } else {
      otherContent = '無'
    }
    return `
      <報名資訊>
      暱稱：${infos[0].nickName}
      電子郵件：${infos[1].email}
      手機號碼：${infos[2].phoneNumber}
      報名類型：${infos[3].type}
      怎麼知道這個活動的？：${infos[4].howToKnow}
      其他：${otherContent}
    `
  }

  return <>
    <GlobalStyle />
    <Layout>
      <ContentWrapper>
        <Title>新拖延運動報名表單</Title>
        <Discription>活動日期：2020/12/10 ~ 2020/12/11</Discription>
        <Discription>活動地點：台北市大安區新生南路二段1號</Discription>
        <Required>必填</Required>
        <Form onSubmit={handleSubmit}>
          <QuestionWrapper>
            <QuestionTitle>暱稱</QuestionTitle>
            <QuestionInput name="nickName" placeholder="您的回答" onChange={handleInputChange}></QuestionInput>
            <Warnning $fill={infos[0].fill}>此欄位不得為空！</Warnning>
          </QuestionWrapper>
          <QuestionWrapper>
            <QuestionTitle>電子郵件</QuestionTitle>
            <QuestionInput type="email" name="email" placeholder="您的電子郵件" onChange={handleInputChange}></QuestionInput>
            <Warnning $fill={infos[1].fill}>此欄位不得為空！</Warnning>
          </QuestionWrapper>
          <QuestionWrapper>
            <QuestionTitle>手機號碼</QuestionTitle>
            <QuestionInput type="number" name="phoneNumber" placeholder="您的手機號碼" onChange={handleInputChange}></QuestionInput>
            <Warnning $fill={infos[2].fill}>此欄位不得為空！</Warnning>
          </QuestionWrapper>
          <QuestionWrapper>
            <QuestionTitle>報名類型</QuestionTitle>
            <Label> <QuestionRadio name='option' type="radio" onChange={handleRadioChecked}/> 躺在床上用想像力實作 </Label> <br/>
            <Label> <QuestionRadio name='option' type="radio" onChange={handleRadioChecked}/> 趴在地上滑手機找現成的 </Label> <br/>
            <Warnning $fill={infos[3].fill}>此欄位不得為空！</Warnning>
          </QuestionWrapper>
          <QuestionWrapper>
            <QuestionTitle>怎麼知道這個活動的？</QuestionTitle>
            <QuestionInput name="howToKnow" placeholder="您的回答" onChange={handleInputChange}></QuestionInput>
            <Warnning $fill={infos[4].fill}>此欄位不得為空！</Warnning>
          </QuestionWrapper>
          <QuestionWrapper>
            <QuestionTitle $notRequied>其它</QuestionTitle>
            <QuestionDescription>對活動的一些建議</QuestionDescription>
            <QuestionInput name="others" placeholder="您的回答" onChange={handleInputChange}></QuestionInput>
          </QuestionWrapper>
          <SubmitBtn type="submit" value="提交"></SubmitBtn>
        </Form>
        <QuestionDescription>請勿透過表單送出您的密碼。</QuestionDescription>
      </ContentWrapper>
    </Layout>
    <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
  </>
}

export default App;

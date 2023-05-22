import React, { useEffect, useState } from 'react';
import './App.css';



function App() {

  // 게시판 글 목록 상태
  let [topics, topicsUpdate] = useState([]);

  // 제목 상태
  let [title, setTitle] = useState("");

  // 설명 상태
  let [description, setDescription] = useState("");

  // 게시판아이디 상태
  let [topicId, setTopicId] = useState(null);

  // HOST설정
  const HOST = process.env.REACT_APP_HOST;

  useEffect(() => {
    init()
    // TODO: 최초호출함수(INIT) 를 구현하기위해 서치하다보니 useEffect를 썻는데 잘 이해가 안간다. 특히 두번쨰 인자는 어떻게 구분해서 써야하나?
  }, []);

  /**
   * 사용자에게 입력 받은 값으로 제목 상태를 업데이트한다.
   * @param {object}} ? TODO: 어떻게 값이 담기는지? 타입이 무엇인지?
   * 
   * FIXME: 하나의 Object로 상태관리 처리하기 
   */
  let titleChange = ({ target: { value } }) => setTitle(value);

  /**
    * 사용자에게 입력 받은 값으로 설명 상태를 업데이트한다.
    * @param {object}} ? TODO: 어떻게 값이 담기는지? 타입이 무엇인지?
    * 
    * FIXME: 하나의 Object로 상태관리 처리하기 
    */
  let desccriptionChange = ({ target: { value } }) => setDescription(value);

  function init() {
    // ... ajax콜을 통해 응답데이터로 topicudpate
    fetch(`http://${HOST}:8000/board`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      //redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(async response => {
        let datas = await response.json();
        topicsUpdate(datas)
      })
      .catch(err => {
        console.log(err);
      });
  }


  function saveTopic() {
    fetch(`http://${HOST}:8000/board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'title': title,
        'description': description
      })
    })
      .then(() => init())
      .catch((err) => {
        console.log("error ", err)
      });
  }

  function updateTopic() {
    fetch(`http://${HOST}:8000/board/${topicId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'title': title,
        'description': description
      })
    })
      .then(() => init())
      .catch((err) => {
        console.log("error ", err)
      });
  }

  function deleteTopic() {
    fetch(`http://${HOST}:8000/board/${topicId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => init())
      .catch((err) => {
        console.log("error ", err)
      });
  }



  const xx = (topic) => {
    setTopicId(topic.id);
    setTitle(topic.title);
    setDescription(topic.description);
  }

  return (
    <div className="App" onSubmit={(event) => event.preventDefault()}>

      <div>
        <form>
          <input autoComplete="off" id="title" name="title" type="text" value={title} onChange={titleChange} />
          <input autoComplete="off" id="description" name="description" type="text" value={description} onChange={desccriptionChange} />
          <button type="submit" onClick={saveTopic}>저장!!!</button>
          <button onClick={updateTopic}>수정</button>
          <button onClick={deleteTopic}>삭제</button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody id="t_list">
            {
              topics.map((topic, idx) => {
                return (
                  <tr key={idx} onClick={() => xx(topic)}>
                    <td>{topic.id}</td>
                    <td>{topic.title}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
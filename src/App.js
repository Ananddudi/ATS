import React,{useState} from 'react';
import './App.css';



function App() {
  const [data,setData] = useState('no data')
  const [file,setFile] = useState('')

  const handlefile = (event)=>{
    setFile(event.target.files[0])
  }

  const postfile = async(e)=>{
    e.preventDefault()
    var newfile = new FormData();
    console.log('file is',file.name)
    newfile.append("filename",file)
    newfile.append("output_format", "txt");
    newfile.append("language", "eng");
    const val = await fetch("https://api.ocrconvert.com/v1/convert?api_token=XdBkryBfnIo8vKdfJPVCVGbYY46zbjCQt8ZpwShyPJ0KxjMxNYEZhSjCsWu1",{
      method:'POST',
      mode:'no-cors',
      body:newfile
    })
    console.log('val',val)
    let valueis = await val.text()
    console.log('value is',valueis)
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="flexboxes">
          <label htmlFor="afile">Upload a file</label>
          <input style={{marginTop:"5%"}} type="file"  onChange={handlefile}/>
          <input style={{marginTop:"5%"}} type="submit" value="submit" onClick={(e)=>postfile(e)}/>
        </form>
        <span style={{marginTop:"5%",width:"100%",height:"30%"}}>{data}</span>
      </header>
    </div>
  );
}

export default App;

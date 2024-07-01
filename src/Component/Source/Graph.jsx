  import React,{useState} from 'react'
  import {Line} from 'react-chartjs-2';
  import ReactSlider from 'react-slider';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


  const Graph = ({all_sensor_data,Chartdata}) => {
    const [lineSliderValues, setLineSliderValues] = useState([0, 1000]); 
    const [selectedKey, SetSelectedKey] = useState([]); 
    const[inputvalues,setInput]=useState('')
   
    const data={
      labels:Chartdata,
      datasets:[{
          // label: 'Headers',
          data: Chartdata,
          backgroundColor:'block',
          borderColor:'red',
          pointBordColor:'aqua',
          fill:true,
          tension:0.4,
          pointLabel: ({ dataIndex }) => {
              // Return the data value for the corresponding point
              return data.datasets[0].data[dataIndex];
          },
      }]
    }
    const options ={
      plugins:{
        // legend:true,
      },
      scales:{
          x: {
              grid:{
                  color:'white'
              },
              ticks: {
                  color: '#2d2d2d', 
              },
          },
          y: {
              min:lineSliderValues[0],
              max:lineSliderValues[1],
              ticks: {
                  color: '#2d2d2d',
              },
              grid:{
                  color:'white'
              },
          },
      }
    }



    let cardData = 'N/A';
    if(all_sensor_data && all_sensor_data.length > 0)
    {
        cardData = all_sensor_data[0];
    }

    const handleLineSliderChange = (value) => {
      setLineSliderValues(value);
    };
    const handleKeyClick = (key) =>
      {
          SetSelectedKey(key);
          sessionStorage.setItem('Chart_status',key)    
      };

      const CollectData=(event)=>{
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
          setInput(inputValue);
        }
      }
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log("error")
          if(inputvalues == ""){
            toast.error('Error Saving!!');
          }else{
            console.log("value",inputvalues)
            sessionStorage.setItem("chartLength",inputvalues);
            const a = sessionStorage.getItem("chartLength");
            setLineSliderValues(a)
          }
        }
      };

      const range =sessionStorage.getItem("chartLength");
      console.log(range)
    return (
      <div>
        <div className='flex p-2 mt-2 ml-2 mb-2 rounded-md border bottom-1 bg-slate-400'>
          <div className='flex gap-2 w-[99%] overflow-auto' style={{scrollbarWidth : 'none'}}>
          {
                Object.keys(cardData)
                .filter(key => key !== '_id' && key !== '__v' && key !== 'Time')
                .map((key,index) => (
                    <div key={key}  className=' text-white-700 flex text-current  text-xs font-medium rounded-md'>
                        
                        <input id={key} type='checkbox' className='cursor-pointer'
                        onChange={() =>handleKeyClick(key)}
                        checked={index === 0 && selectedKey.length === 0 ? true : selectedKey.includes(key)}></input>
                        <div className='flex items-center'>{`${key}`}</div>
                    </div>
                ))
                }
          </div>
          <div className='border right-1'>
          
          </div>
          <div className='flex'>
            <div className='font-bold ml-2 text-white-700'>Range :</div >
            <input type='text' id='email' name='email' autoComplete='off'  onKeyDown={handleKeyDown} onChange={CollectData}  className='w-[50%] ml-2 px-2 '>
         
            </input>
            <ToastContainer />
          </div>
        </div>
    
        <div className="flex justify-center items-center">
          <div className="flex bg-gray-600 rounded-lg p-4">
            <div className='h-[1/2]'>
              <ReactSlider
                className="w-10 h-[95%] flex justify-center items-center"
                thumbClassName="w-5 h-50 bg-[#2d2d2d] rounded-full flex items-center justify-center cursor-pointer text-white font-medium text-xs hover:scale-110"
                trackClassName="w-1 rounded-full bg-gray-300"
                min={0}
                max={range}
                defaultValue={[0, range]}
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
                pearling
                minDistance={5}
                orientation="vertical"
                invert
                onChange={(value) => handleLineSliderChange(value)}
              />
            </div>
            {/* width={1700} height={800}  */}
            <div className='w-full h-full'>
              <Line data={data} width={1000} height={500}  options={options} />
            </div>
          </div>
        </div>
      </div>
        
    )
  }

  export default Graph

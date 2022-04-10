import React,{useState,useEffect} from 'react';
import Popup from 'reactjs-popup';
import {Link,useHistory} from 'react-router-dom';
import './mode.css';

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Col,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  UncontrolledDropdown,
  FormGroup,
  DropdownToggle,
  Form,
  Input,
  Label,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Fade,
  Table,
  Container,
  Row,
  NavbarBrand,
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap";
import { useDetectClickOutside } from 'react-detect-click-outside';


import {useApi} from './contextapi'
// core components


// const openpopup = () => {
  
// }

const Tables = () => {
  const {shownav,userdata,idchange,auth,dashboard,updatingobj} = useApi();
  const [info,setInfo] = useState("")
  const [fadein,setFadein] = useState(false)

  const [next,setNext] = useState(10)
  const [prev,setPrev] = useState(0)
  const [pagprev,setPagprev] = useState(0)
  const [pagnext,setPagnext] = useState(3)
  const [aval,setAval] = useState(0)
  const [toggling,setToggling] = useState(false)
  const [statusfil,setStatusfil] = useState({
    interview:false,
    newjobs:false,
    onboard:false,
    scans:false
  })


  const refs = useDetectClickOutside({ onTriggered: ()=>{setToggling(false)} });
  let history = useHistory();


  useEffect(()=>{
    if(!auth){
      history.push("/auth/login");
    }
    dashboard()
    idchange('')
    setAval(0)
    return shownav(false)
  },[])

  const tabledata = (e)=>{
      e.preventDefault()
      console.log('data is',userdata)
      let val = Math.ceil(userdata.length/10)

      let value = parseInt(e.target.innerText) 
      console.log('e',value)
      setPrev(value*10 - 10)
      setNext(value*10)
      // if(value * 10){
      //   setPrev((pr)=>{
      //     return pr + 10
      //     })
      //   setNext((nx)=>{
      //     return nx + 10
      //     })
      //  }
      }


      // Modal open state
      const [modal, setModal] = React.useState(false);
  
      // Toggle for Modal
      const toggle = () => setModal(!modal);
    

  const checknextpage = () =>{
    if(userdata){
        if(pagnext < 3){
          return
        }
        for(const l in statusfil){
          if(statusfil[l]){
            let val = 0
            if(statusfil.interview){
              for(const k of userdata){
                if(k.status === 'Interviewed'){
                  val += 1
                }
              }
            }
            if(statusfil.scans){
              for(const k of userdata){
                if(k.status === 'Scanning'){
                  val += 1
                }
              }
            }
            if(statusfil.onboard){
              for(const k of userdata){
                if(k.status === 'Onboard'){
                  val += 1
                }
              }
            }
            if(statusfil.newjobs){
              for(const k of userdata){
                if(k.status === 'New Jobs'){
                  val += 1
                }
              }
            }
            
            let newval = val/10
            if(pagnext<newval){
              setPagnext((pr)=>pr+1)
              setAval((v)=>{
              return v + 1
              })
              return setPagprev((p)=>p+1)
            }
          }
        }
        if(pagnext < userdata.length/10){
            setPagprev((pre)=>{
              return pre + 1
            })
            setPagnext((val)=>{
              return val + 1
            })
            setAval((v)=>{
              return v + 1
            })
          }

        }
      }



    const checkprevarray = () =>{
      if(userdata){
        if(next + 10 < userdata.length){
          setPrev(prev - 30)
          setNext(next - 30)
          setPagprev((pre)=>{
            return pre - 1
          })
          setPagnext((val)=>{
            return val - 1
          })
          setAval((v)=>{
            return v - 1
          })
          }
        }
      }


  useEffect(()=>{
    let count = 0
    if(statusfil.interview){
      for(const i of userdata){
        if(i.status === 'Interviewed'){
          count += 1
        }
      }
    }
    if(statusfil.scans){
      for(const i of userdata){
        if(i.status === 'Scanning'){
          count += 1
        }
      }
    }
    if(statusfil.onboard){
      for(const i of userdata){
        if(i.status === 'Onboard'){
          count += 1
        }
      }
    }
    if(statusfil.newjobs){
      for(const i of userdata){
        if(i.status === 'New Jobs'){
          count += 1
        }
      }
    }

    if(count){
      if(count < 10){
        setPagprev(0)
        return setPagnext(1)
      }else if(count < 20){
        setPagprev(0)
        return setPagnext(2)
      }else if(count > 20){
        setPagprev(0)
        return setPagnext(3)
      }

    }

    setPagnext(3)
    setPagprev(0)
  },[statusfil])

  return (

      <Container className="pt-6 bg-gradient-info" fluid>
        <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader><NavbarBrand className='text-info'>Candidate Information</NavbarBrand></ModalHeader>
                <ModalBody className='mb--4 mt--4'>
                    {
                      userdata && userdata.filter((arr)=>{
                        return arr._id === info
                      }).map((obj)=>{
                        const {fullname,_id,email,phoneNumber,experience,
                          currentCTC,expectedCTC,skilltags,cv,status,Rating,mediumFrom,adminNote} = obj
                        return (
                        <Fade in={fadein}>
                        <div key={_id} className=''>
                        <Container className='border border-info pt-3 pl-3 pr-3 rounded'>
                        
                          <Row>
                            <Col xs="6"><h4>Name</h4></Col>
                            <Col xs="6"><span>{fullname}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Email</h4></Col>
                            <Col xs="6"><span>{email}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Mobile Number</h4></Col>
                            <Col xs="6"><span>{phoneNumber}</span></Col>
                          </Row>


                          <Row>
                            <Col xs="6"><h4>Experience</h4></Col>
                            <Col xs="6"><span>{experience}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Current CTC</h4></Col>
                            <Col xs="6"><span>{currentCTC}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Expected CTC</h4></Col>
                            <Col xs="6"><span>{expectedCTC}</span></Col>
                          </Row>
              
                          <Row>
                            <Col xs="6"><h4>Skills</h4></Col>
                            <Col xs="6"><span>{skilltags}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Status</h4></Col>
                            <Col xs="6"><span>{status}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Rating</h4></Col>
                            <Col xs="6"><span>{Rating}</span></Col>
                          </Row>  

                          <Row>
                            <Col xs="6"><h4>Medium</h4></Col>
                            <Col xs="6"><span>{mediumFrom}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>Note</h4></Col>
                            <Col xs="6"><span>{adminNote}</span></Col>
                          </Row>

                          <Row>
                            <Col xs="6"><h4>file</h4></Col>
                            <Col xs="6"><span> <a download="resume.pdf" href={cv} title='Download'>Download</a></span></Col>
                          </Row>                      
                      </Container>
                    </div>
                    </Fade>
                    )
                      })
                    }
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={()=>{
                      setInfo('')
                      toggle()
                      setFadein(false)
                    }}>Okay</Button>
                </ModalFooter>
            </Modal>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Candidate's Data <span ref={refs} className="mb-0 float-right">
                <Dropdown isOpen={toggling} toggle={()=>{
                  return
                }} onClick={()=>setToggling(true)} direction="left" >
                <DropdownToggle caret>
                  Filter By Status
                </DropdownToggle>
            
                <DropdownMenu>
                <Form>
                  <DropdownItem>
                    <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                      defaultChecked={statusfil.interview}
                      onChange={()=>setStatusfil({...statusfil,interview:!statusfil.interview})}
                      />{' '}
                      Interviewed
                    </Label>
                  </FormGroup>
                  </DropdownItem>

                  <DropdownItem>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" 
                      defaultChecked={statusfil.onboard}
                      onChange={()=>setStatusfil({...statusfil,onboard:!statusfil.onboard})}
                      />{' '}
                      Onboard
                    </Label>
                  </FormGroup>
                  </DropdownItem>

                  <DropdownItem>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" 
                      defaultChecked={statusfil.scans}
                      onChange={()=>setStatusfil({...statusfil,scans:!statusfil.scans})}
                      />{' '}
                      Scanning
                    </Label>
                  </FormGroup>
                  </DropdownItem>

                  <DropdownItem>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" 
                      defaultChecked={statusfil.newjobs}
                      onChange={()=>setStatusfil({...statusfil,newjobs:!statusfil.newjobs})}
                      />{' '}
                      New Jobs
                    </Label>
                  </FormGroup>
                  </DropdownItem>

                </Form>
                </DropdownMenu>
              </Dropdown>
                </span>
                </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Experience</th>
                    <th scope="col">View</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                    {
                      userdata &&
                      userdata.filter((data)=>{

                       if(data.status){
                            if(!statusfil.interview && !statusfil.scans && !statusfil.newjobs &&
                              !statusfil.onboard){
                              return true
                            }

                            return(  
                              (statusfil.interview && (data.status === 'Interviewed')) || 
                                (statusfil.scans && (data.status === 'Scanning')) || 
                                (statusfil.newjobs && (data.status === 'New Jobs')) ||
                                (statusfil.onboard && (data.status === 'Onboard'))
                              )
                       }
                       return data
                                                                                         
                      }).slice(prev,next).map((usersdata,index)=>{
                        const {fullname,_id,phoneNumber,experience,rating} = usersdata
                       
                        let idis = _id
                        let ratings = Math.floor(rating/2)
                        if(!rating){
                          ratings = 1
                        }
                        return (
                      <tr key={_id}>
                        <th scope="row">
                          <Media className="align-items-center">
                                  <a
                                  className="avatar rounded-circle mr-3"
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={
                                      require("../../assets/img/theme/userimage.jpg")
                                        .default
                                    }
                                  />
                                </a>
                                <Media>
                                <span className="mb-0 text-sm">
                                  {fullname}
                                </span>
                              </Media>
                          </Media>
                        </th>
                        <td>{phoneNumber?phoneNumber:"Not Provided"}</td>
                        <td> <span className="fa fa-star text-yellow"></span>
                        {[...Array(ratings-1)].map((e,index)=><span key={index} className="fa fa-star checked text-yellow"></span>)}
                        </td>
                        <td>{experience?experience:"Not Provided"}</td>
                        <td><Button color="info" onClick={(e)=> {e.preventDefault();
                          setInfo('')
                          setInfo(_id)
                          setModal(true)
                          setTimeout(()=>{
                          setFadein(true)
                          },500)
                        }}>View</Button></td>
                        <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                idchange(idis)
                                updatingobj(usersdata)
                                history.push('/admin/user-profile')
                              }}
                            >
                              Edit User                           
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                        );
                      })
                    }
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={prev < 30 ? "disabled":""}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) =>{
                          e.preventDefault();
                          checkprevarray()
                        }
                          }
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {
                      [...Array(3+aval)].slice(pagprev,pagnext).map((arr,index)=>{
                        let keys = index + prev
                        
                        return (
                          <>
                            <PaginationItem key={keys} className="active">
                            <PaginationLink
                              href="#pablo"
                              onClick={(e) =>{ 
                                tabledata(e)
                            }}
                            >
                            {index + 1 + aval}
                          </PaginationLink>
                        </PaginationItem>
                       </> 
                       )
                    })                    
                    }
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault()
                          checknextpage()
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        
      </Container>
  );
};

export default Tables;

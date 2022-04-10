
// reactstrap components
import React,{useState,useEffect} from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {useApi} from '../.././views/examples/contextapi';
import { SpinStretch } from "react-cssfx-loading";


const Header = () => {
  const {shownav,userdata,dashboard} = useApi()
  const [totaluser,setTotaluser] = useState(null)
  const [scanning,setScanning] = useState({
    scan:0,
    inter:0,
    onb:0,
    neb:0
  })


  useEffect(()=>{
    dashboard()
    return shownav(false)
  },[])

  const parsinddata = (data) =>{
      let scans = 0
      let interv = 0
      let onboard = 0
      let newj = 0
      data.map((arr)=>{
        const {status} = arr;
        if(status === 'Scanning'){
          scans += 1;
        }
        if(status === 'Interviewed'){
          interv += 1;
        }
        if(status === 'Onboard'){
          onboard += 1;
        }
        if(status === 'New Jobs'){
          newj += 1;
        }
        
      })

      return setScanning({scan:scans,inter:interv,onb:onboard,neb:newj})
  }


  useEffect(()=>{
    if(userdata){
      parsinddata(userdata)
     return setTotaluser(userdata.length)
    }
    return setTotaluser("0")
  },[userdata,shownav])


  if(!userdata){
    return (
      <div style={{position:"fixed",height:"100%",top:"50%",left:"50%",marginTop:"-5%",marginLeft:"5%"}}>
        {/* <Container fluid> */}
      <div>
      <SpinStretch color="green" duration="3s" />
       <h3 className="ml--6">Loading please wait...</h3>
      </div>
      {/* </Container> */}
      </div>
    )
  }

  return (
    <>
      <div className="h-100 bg-gradient-info pt-9 position-fixed">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats ">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Candidate
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totaluser}              
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Join Candidate
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New Jobs
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{scanning.neb}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Scanning
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{scanning.scan}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-street-view" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col  className="left-9 ml-6" lg="6" xl="3">
                <Card className="card-stats  mb-4 mt-3 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Interviewed
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{scanning.inter}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                          <i className="fas fa-user-friends" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col className="left-9 " lg="6" xl="3">
                <Card className="card-stats mb-5 mt-3 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Onboard
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{scanning.onb}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="fas fa-user-plus" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;

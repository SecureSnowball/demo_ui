import React, { useEffect, useState } from 'react';
import qs from 'qs'
import moment from "moment"
import Filter from './Filter';
import './Event.css';


function EventComponent({ ...props }) {

    const [keyword, setKeyword] = useState(null)
    const [date, setDate] = useState(null)
    const [category, setCategory] = useState("")
    const [isVirtual, setIsVirtual] = useState("")
    const [resetFilter, setResetFilter] = useState(false)

    useEffect(() => {
        props.getEventList();
    }, []);

    const fetchFilteredEvents = () => {
        const filterString = qs.stringify({
            keyword: keyword,
            date: date,
            category: category,
            isVirtual: isVirtual
        })
        props.getEventList(filterString);
    }

    useEffect(() => {
        fetchFilteredEvents();
    }, [keyword, date, category, isVirtual]);

    const handleFilterChange = (value, type) => {
        if (type === 'keyword') {
            setKeyword(value)
        } else if (type === 'isVirtual') {
            setIsVirtual(value)
        } else if (type === 'date') {
          if (value) {
            setDate(value)
          } else {
            setDate(null)
         }
        }
    }

    const clearFilter = () => {
        setKeyword(null)
        setCategory("")
        setIsVirtual("")
        setDate(null)
        setResetFilter(!resetFilter)
      }

    let loadData = (
        props.event.eventList.length ?
        props.event.eventList.map(res => {
            return (
                <div className="col-lg-4 col-md-4 col-sm-12 m-b20" key={res.id}>
                    <div className={`card`}>
                        <div className="card-body card-font-size">
                            <div className="row m-b5">
                                <div className="col-lg-10 col-md-10 col-sm-12">
                                    <h5 className="card-title">
                                        <span>{res.title}</span>
                                    </h5>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-12 justify-content-end d-flex">
                                    <h5 className="card-title">
                                        {
                                            res.isVirtual ?
                                                <span className="card-text badge badge-pill badge-secondary">
                                                    {res.isVirtual ? 'Virtual' : 'Face To Face'}
                                                </span>
                                            : null
                                        }
                                    </h5>
                                </div>
                            </div>
                            <div className="row m-b5">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <h5 className="card-title">
                                        <i className='fa fa-calendar'></i>&nbsp;
                                        <span className="card-text">
                                            {moment(res.date).format('YYYY-MM-DD')}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div className="row m-b5">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <h5 className="card-title">
                                        Category<br />
                                        <span className="card-text">
                                            {res.category}
                                        </span>
                                    </h5>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <h5 className="card-title">
                                        <i className='fa fa-map-marker'></i>&nbsp;
                                        Location<br />
                                        <span className="card-text">
                                            {res.address}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div className="row m-b5">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h5 className="card-title">
                                        <span className="card-text">
                                            {res.description}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        :
        <div className="col-lg-4 col-md-12 col-md-12 m-b20">
            <div className="alert alert-primary" role="alert">
                No Data Available!
            </div>
        </div>
    )

    return (
        <div className="m-t10">
            <div className="card-group">
                <div className="row w-100">
                    <Filter
                        key={resetFilter}
                        categoryData={props.event.categoryData}
                        handleFilterChange={handleFilterChange}
                        clearFilter={clearFilter}
                        date={date}
                        keyword={keyword}
                        category={category}
                        isVirtual={isVirtual}
                    />
                </div>
                <div className="row w-100">
                    { loadData }
                </div>
            </div>
        </div>
    );
}

export default EventComponent
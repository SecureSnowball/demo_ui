import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';

const Index = ({
  handleFilterChange,
  clearFilter,
  date,
  keyword,
  isVirtual,
  category,
  categoryData
}) => {
  const [inputKeyword, setKeyword] = useState(keyword ? keyword : '')

  useEffect(() => {
    setKeyword(keyword)
  }, [keyword])

  const handleChange = (value, type) => {
    handleFilterChange(value, type)
  }

  const handleSearchInput = e => {
    setKeyword(e.target.value)
    if (e.target.value === '') {
      handleFilterChange(e.target.value, 'keyword')
    }
  }

  return (
    <div className="col-12">
      <div className="row py-3">
        <div className="col-md-4 py-2">
          <label className="filter-label">Event Date</label>
          <Form>
            <Form.Group controlId="formGridState">
              <Form.Control
                  type="date"
                  value={date}
                  onChange={event => handleChange(event.target.value, 'date')}
              >
              </Form.Control>
            </Form.Group>
          </Form>
        </div>

        <div className="col-md-4 py-2">
          <label className="filter-label">Is Virtual</label>
          <Form>
            <Form.Group controlId="formGridState">
              <Form.Control
                  as="select"
                  value={isVirtual}
                  onChange={event => handleChange(event.target.value, 'isVirtual')}>
                  <option value="">All</option>
                  <option value={true}>Virtual</option>
                  <option value={false}>Face to Face</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>

        <div className="col-md-3 py-2">
          <label className="filter-label">Keyword</label>
          <div class="row">
            <div class="col-12">
                <div class="input-group">
                    <input class="form-control border-secondary py-2" type="search" placeholder='Keyword' value={inputKeyword} onChange={handleSearchInput} />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={() => handleChange(inputKeyword, 'keyword')}>
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="col-md-1 py-2">
          <label className="filter-label">Reset</label>
          <button class="btn btn-outline-secondary" type="button" onClick={() => clearFilter()}>
            <i class="fa fa-refresh"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Index

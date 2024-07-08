import React, {Fragment, useState} from "react";
import {Card, CardHeader, CardTitle, Col, Input, InputGroup, Label, Row} from "reactstrap";
import '../../@core/scss/react/libs/tables/react-dataTable-component.scss'
import {ChevronDown, Search} from "react-feather";
import DataTable from 'react-data-table-component';
import {paginationComponent} from "../../utility/helpers/paginationHelper";
import {getSearchParam} from "../../utility/helpers/searchHelper";

const CustomTable = ({
                        buttons = [],
                         title,
                         columns,
                         data,
                         paginationObject,
                         pagination = false,
                         searchable = true,
                         handleSearch,
                         entriesPerPageOptions = [5, 10, 25, 50, 75, 100]
                     }) => {
    const [searchValue, setSearchValue] = useState(getSearchParam());

    return (
        <Fragment>
            <Row>
                <Col sm='12'>
                    <Fragment>
                        <Card>
                            <CardHeader className='border-bottom'>
                                <CardTitle tag='h4'>{title}</CardTitle>
                                {buttons}
                            </CardHeader>
                            <Row className='mx-0 mt-1 mb-50'>
                                {pagination && (
                                    <Col sm='6'>
                                        <div className='d-flex align-items-center'>
                                            <Label for='entries-select'>Show</Label>
                                            <Input
                                                className='dataTable-select'
                                                type='select'
                                                id='entries-select'
                                                value={paginationObject.currentPerPage}
                                                onChange={(e) => paginationObject.handlePerPageChange(e.target.value)}
                                            >
                                                {entriesPerPageOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </Input>
                                            <Label for='entries-select'>entries</Label>
                                        </div>
                                    </Col>
                                )}
                                {searchable && (
                                    <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1'
                                         sm={pagination ? '6' : '12'}>
                                        <InputGroup size="sm" style={{ width: 'auto' }}>
                                            <span className="input-group-text">
                                                <Search onClick={() => handleSearch(searchValue)} style={{cursor: 'pointer'}}/>
                                            </span>
                                            <Input
                                                className='dataTable-filter'
                                                type='text'
                                                id='search-input'
                                                value={searchValue}
                                                onChange={(event) => {
                                                    const value = event.target.value;

                                                    if (!value && !!searchValue) {
                                                        handleSearch('')
                                                    }

                                                    setSearchValue(value);
                                                }}
                                                placeholder="Search..."
                                            />
                                        </InputGroup>
                                    </Col>
                                )}
                            </Row>
                            <div className='react-dataTable'>
                                <DataTable
                                    bordered
                                    noHeader
                                    pagination={pagination}
                                    paginationComponent={() => paginationComponent(paginationObject)}
                                    paginationServer
                                    className='react-dataTable'
                                    columns={columns}
                                    sortIcon={<ChevronDown size={10}/>}
                                    data={data}
                                />
                            </div>
                        </Card>
                    </Fragment>
                </Col>
            </Row>
        </Fragment>
    );
}

export default CustomTable;

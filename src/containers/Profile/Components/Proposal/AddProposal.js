/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import classes from './Proposal.css'
import Profile from '../../Profile'
import { addCompany, LoadingCompany } from '../../../../store/actions/company'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'
import Button from '../../../../components/Button/Button'

class AddProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {
      },
      error: false,
      letter: '',
      files: [],
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { id } = match.params
    const url = `${HOST_URL}api/orders/${id}/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          order: res.data,
        })
      }).catch(() => this.setState({
        error: true,
      }))
  }

    addProposal = () => {
      const url = `${HOST_URL}api/proposals/`
      const headers = getHeaders()
      headers['Content-Type'] = 'multipart/form-data'

      const { letter, files } = this.state
      const { match } = this.props
      const { id } = match.params
      const formData = new FormData()
      formData.append('files', files)
      formData.append('cargo_adv', id)
      formData.append('text', letter)
      formData.append('profile', CurrentProfileId())
      console.log(formData)
      axios.post(url, formData, {
        headers,
      })
        .then(() => {
          const { currentProfile } = this.props
          const { history } = this.props
          history.push(currentProfile === 'c' ? '/proposal' : '/')
        }).catch((error) => {
          this.setState({
            error: error.message,
          })
        })
    }

    addToFavorite = () => console.log('add to favorite')

  onChangeHandler =(e) => this.setState({
    letter: e.target.value,
  })

   handleChangeImg =(event) => {
     const filesArray = Array.from(event.target.files)
     const list = filesArray.map((item) => ({
       name: item.name,
       url: URL.createObjectURL(event.target.files[0]),
     }))
     const { files } = this.state
     const merge = files.concat(list).filter(
       (file, index, self) => index === self.findIndex((t) => (
         t.name === file.name
       )),
     )

     this.setState({
       files: merge,
     })
   }

   renderFileName =() => this.state.files.map((file) => (

     <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray" index={file}>
       {file.name}
       <Button
         type="button"
         className="btn btn-outline-secondary mr-2 float-right"
         onClick={() => this.deleteFile(this.state.files.indexOf(file))}
       >
         X
       </Button>
     </p>

   ))

   deleteFile = (index) => {
     const { files } = this.state
     files.pop(index)

     this.setState({
       files,
     })
   }

   render() {
     const { currentProfile } = this.props
     const { order, error, letter } = this.state
     if (error) {
       return (
         <Profile>
           <div className="my-3 p-3 bg-white rounded shadow-sm">
             <h3 className="border-bottom border-gray pb-2 mb-0">Something went wrong</h3>
           </div>
         </Profile>
       )
     }
     return (
       <Profile>
         <div className={classes.Proposal}>
           <div className="my-3 p-3 bg-white rounded shadow-sm">
             {currentProfile === 'v'
               ? (
                 <>
                   <Button
                     type="button"
                     className="btn btn-outline-secondary mr-2 float-right"
                     onClick={this.addToFavorite}
                   >
                     Add to favorite
                   </Button>
                   <Button
                     type="button"
                     className="btn btn-outline-secondary mr-2 float-right"
                     onClick={this.addProposal}
                   >
                     Make proposal
                   </Button>
                 </>
               )
               : null}
             <h6 className="border-bottom border-gray pb-2 mb-0">Submit a proposal</h6>
             <div style={{
               textAlign: 'left',
             }}
             >
               <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                 description:&nbsp;
                 {order.description}
               </p>
               <textarea
                 key="coverLetter"
                 value={letter}
                 onChange={(event) => this.onChangeHandler(event)}
               />
               { this.renderFileName() }
               <input className="mb-3" type="file" onChange={this.handleChangeImg} required multiple />

             </div>
           </div>
           <NavLink
             className="btn btn-outline-secondary mr-2"
             to={currentProfile === 'c'
               ? '/proposal'
               : '/'}
             exact
           >
             Exit
           </NavLink>
         </div>

       </Profile>
     )
   }
}
function mapDispatchToProps(dispatch) {
  return {
    LoadingCompany: () => dispatch(LoadingCompany()),
    addCompany: () => dispatch(addCompany()),
  }
}
AddProposal.propTypes = {
  history: PropTypes.func.isRequired,
  match: {
    params: {
      id: PropTypes.string.isRequired,
    },
  }.isRequired,
  currentProfile: PropTypes.string.isRequired,
}

function mapStateToProps() {
  return {
    currentProfile: localStorage.getItem('currentProfile'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProposal)

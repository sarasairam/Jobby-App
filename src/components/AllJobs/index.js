import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureViewImg =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png'

class AllJobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkboxInputs: [],
    radioInput: '',
    searchInput: '',
    checkboxInputsLocation: [],
    apiStatus: apiStatusConstants.initial,
    apiJobStatus: apiJobsStatusConstants.initial,
  }

  componentDidMount = () => {
    this.onGetProfileDetails()
    this.onGetJobDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    // eslint-disable-next-line no-unused-vars
    const {checkboxInputs, radioInput, searchInput} = this.state
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(profileApiUrl, optionsProfile)
    if (responseProfile.ok === true) {
      const fetchedDataProfile = [await responseProfile.json()]
      const updatedDataProfile = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedDataProfile,
        responseSuccess: true,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onGetJobDetails = async () => {
    this.setState({apiJobStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {
      checkboxInputs,
      radioInput,
      searchInput,
      checkboxInputsLocation,
    } = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(jobsApiUrl, optionsJobs)
    if (responseJobs.ok === true) {
      const fetchedDataJobs = await responseJobs.json()
      let updatedDataJobs = fetchedDataJobs.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      const locationLength = checkboxInputsLocation.length
      if (locationLength === 0) {
        this.setState({
          jobsData: updatedDataJobs,
          apiJobStatus: apiJobsStatusConstants.success,
        })
      } else if (locationLength === 1) {
        updatedDataJobs = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[0],
        )
        console.log(updatedDataJobs)
        this.setState({
          jobsData: updatedDataJobs,
          apiJobStatus: apiJobsStatusConstants.success,
        })
      } else if (locationLength === 2) {
        const updatedDataJobs1 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[0],
        )
        const updatedDataJobs2 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[1],
        )
        updatedDataJobs = [...updatedDataJobs1, ...updatedDataJobs2]
        this.setState({
          jobsData: updatedDataJobs,
          apiJobStatus: apiJobsStatusConstants.success,
        })
      } else if (locationLength === 3) {
        const updatedDataJobs1 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[0],
        )
        const updatedDataJobs2 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[1],
        )
        const updatedDataJobs3 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[2],
        )
        updatedDataJobs = [
          ...updatedDataJobs1,
          ...updatedDataJobs2,
          ...updatedDataJobs3,
        ]
        this.setState({
          jobsData: updatedDataJobs,
          apiJobStatus: apiJobsStatusConstants.success,
        })
      } else if (locationLength === 4) {
        const updatedDataJobs1 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[0],
        )
        const updatedDataJobs2 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[1],
        )
        const updatedDataJobs3 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[2],
        )
        const updatedDataJobs4 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[3],
        )
        updatedDataJobs = [
          ...updatedDataJobs1,
          ...updatedDataJobs2,
          ...updatedDataJobs3,
          ...updatedDataJobs4,
        ]
        this.setState({
          jobsData: updatedDataJobs,
          apiJobStatus: apiJobsStatusConstants.success,
        })
      } else if (locationLength === 5) {
        const updatedDataJobs1 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[0],
        )
        const updatedDataJobs2 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[1],
        )
        const updatedDataJobs3 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[2],
        )
        const updatedDataJobs4 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[3],
        )
        const updatedDataJobs5 = updatedDataJobs.filter(
          each => each.location === checkboxInputsLocation[4],
        )
        updatedDataJobs = [
          ...updatedDataJobs1,
          ...updatedDataJobs2,
          ...updatedDataJobs3,
          ...updatedDataJobs4,
          ...updatedDataJobs5,
        ]
        this.setState({
          jobsData: updatedDataJobs,
          apiJobStatus: apiJobsStatusConstants.success,
        })
      }
    } else {
      this.setState({apiJobStatus: apiJobsStatusConstants.failure})
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.onGetJobDetails)
  }

  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.onGetJobDetails,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        // eslint-disable-next-line no-unused-vars
        prevState => ({checkboxInputs: filteredData}),
        this.onGetJobDetails,
      )
    }
  }

  onGetInputOptionLocation = event => {
    const {checkboxInputsLocation} = this.state
    const inputNotInList = checkboxInputsLocation.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputsLocation: [
            ...prevState.checkboxInputsLocation,
            event.target.id,
          ],
        }),
        this.onGetJobDetails,
      )
    } else {
      const filteredData = checkboxInputsLocation.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        // eslint-disable-next-line no-unused-vars
        prevState => ({checkboxInputsLocation: filteredData}),
        this.onGetJobDetails,
      )
    }
  }

  onGetProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-icon" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.onGetProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderProfileStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onGetProfileView()
      case apiStatusConstants.failure:
        return this.onGetProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onRetryJobs = () => {
    this.onGetJobDetails()
  }

  onGetJobsFailureView = () => (
    <div className="failure-img-button-container">
      <img className="failure-img" src={failureViewImg} alt="failure view" />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        we cannot seem to find the page you are looking for
      </p>
      <div className="jobs-failure-button-container">
        <button
          className="failure-button"
          type="button"
          onClick={this.onRetryJobs}
        >
          Retry
        </button>
      </div>
    </div>
  )

  onGetJobsView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul className="ul-job-items-container">
        {jobsData.map(eachItem => (
          <JobItem key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    )
  }

  onRenderJobsStatus = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiJobsStatusConstants.success:
        return this.onGetJobsView()
      case apiJobsStatusConstants.failure:
        return this.onGetJobsFailureView()
      case apiJobsStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onGetCheckBoxesView = () => (
    <ul className="check-boxes-container">
      {employmentTypesList.map(eachItem => (
        <li className="li-container" key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetInputOption}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetCheckBoxesLocationView = () => (
    <ul className="check-boxes-container">
      <li className="li-container">
        <input
          className="input"
          id="Hyderabad"
          type="checkbox"
          onChange={this.onGetInputOptionLocation}
        />
        <label className="label" htmlFor="Hyderabad">
          Hyderabad
        </label>
      </li>
      <li className="li-container">
        <input
          className="input"
          id="Delhi"
          type="checkbox"
          onChange={this.onGetInputOptionLocation}
        />
        <label className="label" htmlFor="Delhi">
          Delhi
        </label>
      </li>
      <li className="li-container">
        <input
          className="input"
          id="Bangalore"
          type="checkbox"
          onChange={this.onGetInputOptionLocation}
        />
        <label className="label" htmlFor="Bangalore">
          Bangalore
        </label>
      </li>
      <li className="li-container">
        <input
          className="input"
          id="Chennai"
          type="checkbox"
          onChange={this.onGetInputOptionLocation}
        />
        <label className="label" htmlFor="Chennai">
          Chennai
        </label>
      </li>
      <li className="li-container">
        <input
          className="input"
          id="Mumbai"
          type="checkbox"
          onChange={this.onGetInputOptionLocation}
        />
        <label className="label" htmlFor="Mumbai">
          Mumbai
        </label>
      </li>
    </ul>
  )

  onGetRadioButtonsView = () => (
    <ul className="radio-button-container">
      {salaryRangesList.map(eachItem => (
        <li className="li-container" key={eachItem.salaryRangeId}>
          <input
            className="radio"
            id={eachItem.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.onGetRadioOption}
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onSubmitSearchInput = () => {
    this.onGetJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onGetJobDetails()
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {checkboxInputs, radioInput, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="side-bar-container">
            {this.onRenderProfileStatus()}
            <hr className="hr-line" />
            <h1 className="text">Type of Employment</h1>
            {this.onGetCheckBoxesView()}
            <hr className="hr-line" />
            <h1 className="text">Salary Range</h1>
            {this.onGetRadioButtonsView()}
            <hr className="hr-line" />
            <h1 className="text">Locations</h1>
            {this.onGetCheckBoxesLocationView()}
          </div>
          <div className="jobs-container">
            <div>
              <input
                className="search-input"
                type="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.onRenderJobsStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default AllJobs

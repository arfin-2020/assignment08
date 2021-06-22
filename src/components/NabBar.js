import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../App"

const NabBar = () => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext)
  // const signOutUser = () => {
  //   const signOutUser ={
  //     isSignedIn: false,
  //     name: '',
  //     photo: '',
  //     email: '',
  // }
  // setloggedInUser(signOutUser)
  // }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Cupa America
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/"> Home </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/meal"> Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/googleAuth">Google Authentication</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/shipment">Shipment</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/review">Review</a>
              </li>
             
              <li className="nav-item">
              <Link style={{ textDecoration:'none' }} to="/inventory">Inventory</Link>
            </li>
            <button onClick={()=>setloggedInUser({})}>signOut</button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NabBar

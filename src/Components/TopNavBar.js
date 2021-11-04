import React from 'react'

import '../Styling/TopNavBar.css'

export default function TopNavBar() {
    return (
        <div class="topnav">
            <a class="navleft" href="#home">Home</a>
            <a class="navleft" href="#news">Platform</a>
            <a class="navleft" href="#contact">About</a>
            <a class="navleft" href="#about">In the News</a>
            <a class="active navleft" href="#insights">Insights</a>
            <a class="navright" href="#Login">Request A Demo</a>
            <a class="navright" href="#Login">Login</a>
        </div>
    )
}

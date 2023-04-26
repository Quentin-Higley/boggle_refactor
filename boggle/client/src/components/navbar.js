import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/lobby">Lobby</a>
                </li>
                <li>
                    <a href="/create">Create</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
            </ul>
        </div>
    );
}

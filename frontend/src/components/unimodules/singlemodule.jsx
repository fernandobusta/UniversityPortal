import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

import Button from '@mui/material/Button';


function SingleModule() {

    const { shortcode } = useParams();
    const [module, setModule] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/module/${shortcode}`);
            const json = await response.json();
            setModule(json);
        };
        fetchModules()
        .catch((error) => {
            console.error(`Failed to fetch ${shortcode} cohorts: `, error);
        });
    }, []);

    const listOrNolist = (degrees) => {
        if (Array.isArray(degrees)) {
            return (
            <div>
            {degrees.map((degree) => (
                <Button variant="contained" component={Link} to={`/cohorts/${degree.slice(33,-1)}`}>{degree.slice(33,-1)}</Button>
            ))}
            </div>
            );
                
        } else {
            return (degrees);
        }
    };
    console.log(module);
    const content = () => {
        return (
            <div>
                <h1>Single Module: {module.code} - {module.full_name}</h1>
                <p>Delivered to: <br /><br />
                    {listOrNolist(module.delivered_to)}
                    <br />
                    With a <b>CA</b> split of <b>{module.ca_split}</b>
                </p>
            </div>
        );
    }

    return content();
}

export default SingleModule;
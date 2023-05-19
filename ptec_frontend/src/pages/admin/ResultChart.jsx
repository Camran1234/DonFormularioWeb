import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import sqlRequest from '../../components/sqlRequest';
import { useParams } from 'react-router-dom';

const RenderBarChart = ({idEnunciado,enunciado, data}) => {
    
                           

    return (
        <>
            <h2 className='text-left black'>{enunciado}</h2>
            <BarChart key={idEnunciado} width={900} height={400} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="cantidad" fill="#8884d8" barSize={30} />
            </BarChart>
        </>
    )
}

export default RenderBarChart;
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function MovieForm() {
  const params = useParams();
  const navigate = useNavigate();
  return ( 
    <div>
      <h1>Movie: { params.id }</h1>
      <button onClick={() => navigate('/movies')} className='btn btn-primary'>Save</button>
    </div>
   );
}

export default MovieForm;
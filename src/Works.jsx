import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WorkItem from './components/WorkItem';
import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';
// import { checkWidth } from './utils/common';

const StyledWorks = styled.main`
  .my-masonry-grid {
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }

  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    background: none;
    margin-bottom: 100px;
  }
`;

function calcColumn() {
  if (window.innerWidth < 600) {
    return 1;
  } else if (window.innerWidth < 1024) {
    return 2;
  } else {
    return 3;
  }
}

function Works() {
  const works = useSelector(state => state.works);
  const [columnNum, setColumnNum] = useState(calcColumn);
  function resizeHandler() {
    setColumnNum(calcColumn());
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // console.log('columNum', columNum);

  return (
    <StyledWorks>
      <h2 className='title'>Work</h2>
      <h3>Artist Chosang's works.</h3>
      <Masonry
        breakpointCols={columnNum}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {Object.keys(works)
          .reverse()
          .map(key => {
            return <WorkItem key={key} {...works[key]} />;
          })}
      </Masonry>
    </StyledWorks>
  );
}

export default Works;

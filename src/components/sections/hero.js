import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled, { css } from 'styled-components'
import Lottie from 'react-lottie';
import * as developer from '@images/lottie/developer.json'
import { email } from '@config'
import { StaticImage } from 'gatsby-plugin-image'
import { usePrefersReducedMotion } from '@hooks'
import { navDelay, loaderDelay, contentDelay } from '@utils';

// ${({ theme }) => theme.mixins.flexCenter};

const StyledHero = styled.section`
    ${({ theme }) => theme.mixins.flexCenter};
    padding: 0;
    max-width:1200px;
    flex-direction:column;
    .heroContent{
      display:grid;
      grid-template-columns:3fr 2fr;
      width:100%;
      min-height:100vh;
      
      @media screen and (max-width:1200px){
        margin-top:200px;
        grid-template-columns:1fr;
        min-height:50vh;
      }

      @media screen and (max-width:768px){
        margin-top:150px;
      }

      .left{
        ${({ theme }) => theme.mixins.flexCenter};
        align-items:flex-start;
        flex-direction: column;

        .item{
            padding: 8px 0;
        }
        
        p{
            font-size: clamp(var(--fs-sm), 8vw, var(--fs-md));
            margin-left:3px;
        }
        h1{
            font-size: clamp(24px, 10vw, 66px);
            font-weight:400;
        }
        h2{
            font-size: clamp(20px, 10vw, 58px);
            color: var(--light-orange);
        }
        h3{
            margin-top:20px;
            max-width: 570px;
            font-size: var(--fs-lg);
            color: var(--gray);
            font-weight:300;
        }

        div:last-child{
          margin-top: 70px;
          a{
              ${({ theme }) => theme.mixins.contactButton};
          }
          @media screen and (max-width:768px){
            margin:60px 0;
          }
      }
  }
    }
    .right{   
      ${({ theme }) => theme.mixins.flexCenter};
      flex-direction: column;
    }
`

const StyledLottie = styled.div`
    position:relative;
`

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);

    return () => clearTimeout(timeout);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: developer,
  };



  const saint = <p>Hi, my name is</p>;
  const crimea = <h1>Quang Huy.</h1>;
  const moscow = <h2>I make soul for the web.</h2>;
  const kaliningrad = <h3>I’m a Front-end web developer who specializes in building UI/UX websites. Learning new technologies as well as design websites is my passion. Currently, I’m primarily focusing on growing to the next level of development knowledge.</h3>;
  const samara = (
    <a href={`mailto:${email}`}>Get in touch</a>
  );

  const russia = [saint, crimea, moscow, kaliningrad, samara]

  return (
    <StyledHero>
      <div className="heroContent">
        {prefersReducedMotion ? (
          <>
            <div className="left">
              {russia.map((item, index) => (
                <div key={index} className="item">{item}</div>
              ))}
            </div>
            <div className="right">
              <StyledLottie>
                <Lottie className="lottie" options={defaultOptions} height={450} width={450} />
              </StyledLottie>
            </div>
          </>
        ) : (
          <>
            <div className="left">
              <TransitionGroup component={null}>
                {isMounted && russia.map((item, index) => (
                  <CSSTransition key={index} classNames="fadedown" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${index + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
            <div className="right">
              <TransitionGroup component={null}>
                {isMounted &&
                  <CSSTransition classNames="fade" timeout={contentDelay}>
                    <StyledLottie style={{ transitionDelay: `${russia.length * 100}ms` }}>
                      <Lottie className="lottie" options={defaultOptions} />
                    </StyledLottie>
                  </CSSTransition>
                }
              </TransitionGroup>
            </div>
          </>
        )}
      </div>
    </StyledHero>
  )
}

export default Hero

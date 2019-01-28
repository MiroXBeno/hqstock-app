import React from 'react';
import logo from '../logo.svg';
import logoText from '../logoText.svg';
import '../styles/Header.css';

export interface IHeaderProps {
    onRequestData: (stockSymbol: string, startDate: string) => void;
    loading?: boolean;
}

interface IHeaderState {
    stockSymbol: string;
    startDate: string;
}

export default class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
    state: IHeaderState = {
        stockSymbol: "HD",
        startDate: "2018-01-01"        
    };

    loaderRef = React.createRef<HTMLImageElement>();

    handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();    
        this.startLoader();    
        this.props.onRequestData(this.state.stockSymbol, this.state.startDate);
      }

    startLoader = () => {
        if (this.loaderRef.current) {
            this.loaderRef.current.style.animationPlayState = "running";
        }
    } 
    
    checkLoader = () => {
        if (this.loaderRef.current) {
            this.loaderRef.current.style.animationPlayState = this.props.loading ? "running" : "paused";
        }
    }

    render() {
        return (
            <header className="header">
                <div className="header__title">
                    <img src={logo} className="title__logo" ref={this.loaderRef} onAnimationIteration={this.checkLoader} alt="logo" />
                    <img src={logoText} alt="logoText" />
                </ div>
                <form onSubmit={this.handleSubmitForm} className="header__form">
                    <div className="form__box">
                        <label>Stock symbol</label>
                        <input
                            type="text"
                            value={this.state.stockSymbol}
                            onChange={e => this.setState({ stockSymbol: e.target.value })}
                        />
                    </div>
                    <div className="form__box">
                        <label>Start date</label>
                        <input
                            type="date"
                            value={this.state.startDate}
                            onChange={e => this.setState({ startDate: e.target.value })}
                        />
                    </div>
                    <div className="form__box">
                        <button disabled={!this.state.startDate || !this.state.stockSymbol || this.props.loading} >Show me!</ button>
                    </div>
                </form>
            </header>
        );
    }
}

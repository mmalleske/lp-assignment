import React from "react";

export default class ProfileCard extends React.Component {

  render() {
    const { name, description, imageUrl } = this.props;
    console.log('foo', imageUrl, name)
    return (
      <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
        <div className="tc">
          <img src={imageUrl} className="br-100 h3 w3 dib" />
          <h1 className="f4">{name}</h1>
        </div>
        <p className="lh-copy measure center f6 black-70">
          {description}
        </p>
      </article>
    );

  }
}

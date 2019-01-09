import React from 'react';
import { AppLoading, Asset, Font } from 'expo';
import Navigation from 'app/src';
import fonts from 'app/src/fonts'
import images from 'app/src/images'

export default class App extends React.Component {
  static defaultProps = {
    skipLoadingScreen: false,
  }

  state = {
    isLoadingComplete: false
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return <Navigation />
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync(Object.keys(images).map(key => images[key])),
      Font.loadAsync(fonts),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

console.info('contentScript is running')

function getYoutubeTranscriptContent() {
  let scripts = document.querySelectorAll('.segment-text.ytd-transcript-segment-renderer');

  let texts: string[] = [];
  scripts.forEach((p) => {
    // @ts-ignore
    // @ts-nocheck
    texts.push(p.innerText);
  })

  console.log(texts);
  return texts
}

function copy(text: any) {
  var input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {

  if (message.action === 'open_transcript') {
    const ele = document.querySelector(message.selector);
    if (ele) {
      ele.click();
      setTimeout(function() {
        sendResponse({success: true});
      }, 500);
      return true;
    } else {
      sendResponse({success: false});
    }
  }

  if (message.action === 'copy_transcript') {
    const content = getYoutubeTranscriptContent();
    copy(JSON.stringify(content, null, 2));
    setTimeout(function() {
      sendResponse({success: true});
    }, 500);
    return true;
  }
});

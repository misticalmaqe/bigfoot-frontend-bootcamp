import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  console.log("navigate", navigate);
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Bigfoot Homepage</h3>
          <p className="paragraph-content">
            I ran into Bigfoot while we both toured France 🇫🇷 remember him, the
            guy so hairy he needed no pants? I had run into him before in
            Tennessee but I didn't have my.45-70 rifle on me, we laughed and
            decided to let the past be. 🤣 I said all those TV and movie
            contracts must have made you pretty rich, he said my agent is a hard
            charging son of a b...h! It was getting near wine time over in Paree
            l invited him for brandy and champagne 🍾 with me. We started with
            fresh croissants covered with fresh goose pate and since in we
            France toasted Andre a giant wrestler RIP today. He told me you know
            Andre was one of ours though he would have to shave for hours to
            look like you little guys, now he wrestles in the skies! I could see
            👀 the tear form in his eye, though big he was a sentimental guy, he
            said Andre was an artsy guy painting a tower to his home in the sky.
          </p>
        </div>
      </div>
    </>
  );
};
export default LandingPage;

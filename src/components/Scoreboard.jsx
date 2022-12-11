import PropTypes from "prop-types";

export default function Scoreboard({ homeScore, awayScore }) {
  return (
    <section className="flex flex-row gap-x-4">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl">Home</h2>
        <p className="text-4xl">{homeScore}</p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl">Away</h2>
        <p className="text-4xl">{awayScore}</p>
      </div>
    </section>
  );
}

Scoreboard.propTypes = {
  homeScore: PropTypes.number,
  awayScore: PropTypes.number,
};

Scoreboard.defaultProps = {
  homeScore: 0,
  awayScore: 0,
};

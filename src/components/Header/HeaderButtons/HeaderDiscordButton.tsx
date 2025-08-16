export default function HeaderDiscordButton() {
  return (
    <button
      className="h-5 w-5 min-h-5 min-w-5 cursor-pointer"
      onClick={() => {
        window.open("https://discord.gg/NwzYjZadaS");
      }}
    >
      <img
        className="h-5 w-5 min-h-5 min-w-5"
        src="assets/discord.svg"
        alt="Discord"
        title="Join the ScapeTools Discord server"
      />
    </button>
  );
}

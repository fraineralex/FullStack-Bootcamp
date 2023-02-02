
const RenderLoginForm = ({handleLogin,username, setUsername, password, setPassword  }) => (
    <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            name='Username'
            placeholder='Username'
            onChange={({target}) => setUsername(target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({target}) => setPassword(target.value)}
          />
        </div>

        <button>
          Login
        </button>

    </form>
)

export default RenderLoginForm
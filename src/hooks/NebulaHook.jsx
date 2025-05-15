// src/context/SessionContext.jsx
import React, { createContext, useContext, useState } from 'react';
import {
  createThirdwebClient,
  prepareTransaction,
  sendTransaction,
  privateKeyToAccount,
} from 'thirdweb';

// Create the session context
const SessionContext = createContext(null);

// Default options for session creation + chat
const defaultOptions = {
  apiUrl:    'https://nebula-api.thirdweb.com/session',
  chatUrl:   'https://nebula-api.thirdweb.com/chat',
  // YOUR Nebula secret key (for /session & /chat)
  secretKey: "Lv5futzs0NgyRMa3VJ04m_WinKRP22vsP-aFKn1tQe45ioz3efSXTObelCO5VD-MSY3Ngu6ntsfvjgIoynWiaA",
  // Thirdweb credentials (used only if Nebula returns actions)
  eoaPrivateKey: "50417c2e73dfa4b659c474ab9b39f0aa1062a9aaf8183a4b0cbb4141171f5be4",
  clientId:"0ac5f5103f8eaf61523d040a52d5453d"
};

/** 
 * Internal: parse + execute Nebula actions via Thirdweb 
 */
async function handleActions(actions, opts) {
  if (!actions?.length) return null;

  // initialize thirdweb client
  const client = createThirdwebClient({
    secretKey,
  });

  // initialize account
  const account = privateKeyToAccount({
    client,
    privateKey: opts.eoaPrivateKey,
  });

  // for demo, we only process the first action
  const action = actions[0];
  const txData = JSON.parse(action.data);

  const transaction = prepareTransaction({
    to:       txData.to,
    data:     txData.data,
    value:    BigInt(txData.value),
    chain:    txData.chainId,
    client,
  });

  // broadcast
  return await sendTransaction({
    transaction,
    account,
  });
}

/**
 * Hook to manage session lifecycle & chat
 * @param options - Override API URLs or secret key
 */
export const useSessionClient = (options = defaultOptions) => {
  const opts = { ...defaultOptions, ...options };

  // session state
  const [session,     setSession]     = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);

  // chat state
  const [chatResult,  setChatResult]  = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError,   setChatError]   = useState(null);

  /**
   * Create a new Nebula session
   */
  const createSession = async ({
    title,
    chainIds      = ["5003"],
    walletAddress = "0xdb217E7c29cc0c32e548D4D682c569f1A1aE920b",
  }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(opts.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': opts.secretKey,
        },
        body: JSON.stringify({
          title,
          context: { chain_ids: chainIds, wallet_address: walletAddress },
        }),
      });
      if (!res.ok) throw new Error(`Failed to create session: ${res.status}`);
      const { result } = await res.json();
      setSession(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a chat message to Nebula.
   * If response.actions is non-empty, automatically executes them via Thirdweb.
   * Returns an object of shape:
   *   { nebula: <raw nebula response>, executionResult?: <thirdweb tx result> }
   */
  const sendMessage = async ({
    message,
    stream  = false,
    context = {},
  }) => {
    if (!session?.session_id) {
      throw new Error('No session yet – call createSession() first.');
    }

    setChatLoading(true);
    setChatError(null);

    try {
      const res = await fetch(opts.chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': opts.secretKey,
        },
        body: JSON.stringify({
          message,
          stream,
          session_id: session.session_id,
          context,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Chat API error (${res.status}): ${text}`);
      }

      const nebula = await res.json();
      setChatResult(nebula);

      // if there are actions, execute them
      const executionResult = await handleActions(nebula.actions, opts);

      // return both for maximum flexibility & backward compatibility
      return { nebula, executionResult };
    } catch (err) {
      setChatError(err);
      throw err;
    } finally {
      setChatLoading(false);
    }
  };

  return {
    session,
    createSession,
    loading,
    error,

    sendMessage,
    chatResult,
    chatLoading,
    chatError,
  };
};

/**
 * Provider component
 */
export const SessionProvider = ({ children, options }) => {
  const sessionClient = useSessionClient(options);
  return (
    <SessionContext.Provider value={sessionClient}>
      {children}
    </SessionContext.Provider>
  );
};

/**
 * Hook to access session & chat
 */
export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within a SessionProvider');
  return ctx;
};

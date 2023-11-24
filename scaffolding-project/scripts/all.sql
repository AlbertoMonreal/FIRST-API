CREATE TABLE IF NOT EXISTS public.samples
(
    id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 ),
    type text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT type_uq UNIQUE (type)
);
CREATE TABLE IF NOT EXISTS public.users
(
    id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 ),
    username text NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT username_uq UNIQUE (username)
);

